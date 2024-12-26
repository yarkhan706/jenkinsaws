pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key') // Make sure this matches your Jenkins credential ID
    }
    
    stages {
        stage('GitHub Pull') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Running as user: $(whoami)"
                            
                            # Use SSH to log in and pull the latest code from GitHub
                            SSH_OPTIONS="-o StrictHostKeyChecking=no -i /home/ubuntu/.ssh/id_rsa"
                            
                            ssh $SSH_OPTIONS ubuntu@3.94.179.249 "
                                cd /var/www/html &&
                                git stash || git reset --hard &&
                                git pull origin main
                            "
                        '''
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo Installing dependencies on remote server
                            ssh $SSH_OPTIONS ubuntu@3.94.179.249 "cd /var/www/html && npm install"
                        '''
                    }
                }
            }
        }
        
        stage('Build Next.js App') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo Building the Next.js application
                            ssh $SSH_OPTIONS ubuntu@3.94.179.249 "cd /var/www/html && npm run build"
                        '''
                    }
                }
            }
        }

        stage('Restart Apache') {
            steps {
                script {
                    // Directly SSH into Apache server and restart apache2
                    sh '''
                        set -x
                        echo Restarting Apache to serve the updated app
                        ssh -o StrictHostKeyChecking=no -i /home/ubuntu/.ssh/id_rsa ubuntu@3.94.179.249 "sudo systemctl restart apache2"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment pipeline executed successfully!'
        }
        failure {
            echo 'There was an issue with the deployment pipeline!'
        }
    }
}
