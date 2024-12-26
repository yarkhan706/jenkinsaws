pipeline {
    agent any
    
    environment {
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key') // Jenkins credential ID for the private SSH key
    }
    
    triggers {
        githubPush()  // Trigger on GitHub push events
    }

    stages {
        stage('GitHub Pull') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {  // Use the SSH key credential in Jenkins
                        sh '''
                            set -x
                            echo "Running as user: $(whoami)"

                            # SSH options
                            SSH_OPTIONS="-o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY"

                            # SSH into the remote server and pull the latest changes
                            ssh $SSH_OPTIONS ubuntu@3.94.179.249 "
                                cd /var/www/html &&
                                # Handle uncommitted changes to avoid conflicts
                                git stash || git reset --hard &&
                                git config --global --add safe.directory /var/www/html &&
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
                    sshagent (credentials: ['jenkins-ssh-key']) {  // Use the SSH key credential in Jenkins
                        sh '''
                            set -x
                            echo "Installing dependencies on the remote server"

                            # SSH into the remote server and run npm install
                            ssh $SSH_OPTIONS ubuntu@3.94.179.249 "
                                cd /var/www/html &&
                                npm install
                            "
                        '''
                    }
                }
            }
        }

        stage('Build Next.js App') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {  // Use the SSH key credential in Jenkins
                        sh '''
                            set -x
                            echo "Building the Next.js application"

                            # SSH into the remote server and run npm run build
                            ssh $SSH_OPTIONS ubuntu@3.94.179.249 "
                                cd /var/www/html &&
                                npm run build
                            "
                        '''
                    }
                }
            }
        }

        stage('Restart Apache') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {  // Use the SSH key credential in Jenkins
                        sh '''
                            set -x
                            echo "Restarting Apache to serve the updated app"

                            # SSH into the remote server and restart Apache
                            ssh $SSH_OPTIONS ubuntu@3.94.179.249 "
                                sudo systemctl restart apache2
                            "
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment pipeline executed successfully!'
        }
        failure {
            echo 'Deployment pipeline failed! Check the logs for more details.'
        }
    }
}
