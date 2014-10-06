'use strict';
var path = require('path');

module.exports = function(grunt) {
	// Do grunt-related things in here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			dev: {
				options: {
					paths: ['app/css'],
					compress: false,
					ieCompat: true,
				},
				files: {
					'app/css/styles.css': 'app/less/styles.less',
					'app/css/switcher.css': 'app/less/switcher.less',
					'app/css/color-mint.css': 'app/less/color-mint.less',
					'app/css/color-ice.css': 'app/less/color-ice.less',
					'app/css/color-cherry.css': 'app/less/color-cherry.less'
				}
			},
			prod: {
				options: {
					paths: ['css'],
					compress: true,
					ieCompat: true,
				},
				files: {
					'app/css/styles.min.css': 'app/less/styles.less'
				}
			}
		},
		shell: {
	        git_add: {
	            command: 'git add -A'
	        },
	        git_commit: {
	            command: 'git commit -m "<%= pkg.name %> - <%= pkg.lastComment %>"'
	        },
	        git_push: {
	            options: {
	                stdout: true
	            },
	            command: 'git push'
	        },
	        shutdown: {
	            command: 'shutdown /p'
	        }
		},
		'ftp-deploy': {
		  build: {
		    auth: {
		      host: 'dyaa.me',
		      port: 21,
		      authKey: 'key1'
		    },
		    src: '.',
		    dest: '#',
		    exclusions: ['.ftppass', '.git','node_modules','gruntfile.js','package.json','app/css/**.less']
		  }
		},
		backup: {
		    root_backup: {
		      	src: '.',
		      	dest: '../2013.tgz'
		    },
		},
	    watch: {
	    	options: { livereload: true },
	      	less: {
	        	files: ['app/less/styles.less'],
	        	tasks: ['newer:less:dev'],
	      	}
	    },
	    bumpup: {
	        file: 'package.json'
	    },
		connect: {
			server: {
				options: {
					port: 9005,
					base: 'app',
					hostname: '*',
					livereload:true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-backup');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-bumpup');

	grunt.task.registerTask('default', ['connect','watch']);
	grunt.task.registerTask('git', ['bumpup:patch','shell:git_add','shell:git_commit','shell:git_push']);
	grunt.task.registerTask('ftp', ['ftp-deploy']);
	grunt.task.registerTask('goodbye', ['shell:shutdown']);

};