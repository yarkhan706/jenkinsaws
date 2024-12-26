pipeline {
    agent any

    triggers {
        githubPush()  // Trigger the pipeline on a GitHub push
    }

    environment {
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key')  // Ensure this matches your Jenkins credential ID for SSH access
        SSH_KEY_PATH = "/home/ubuntu/.ssh/id_rsa"  // Set the correct SSH private key path
    }

    stages {
        stage('GitHub Pull') {
            steps {
                script {
                    sshagent(credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Running as user: $(whoami)"

                            # Set up SSH options (make sure the key is in the right place)
                            SSH_OPTIONS="-o StrictHostKeyChecking=no -i ${SSH_KEY_PATH}"

                            # Log in to the remote server and pull the latest changes
                            ssh $SSH_OPTIONS ubuntu@44.203.126.229 "
                                cd /var/www/html &&
                                
                                # Handle any uncommitted changes to avoid conflicts
                                git stash || git reset --hard &&
                                
                                # Pull the latest code from GitHub
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
                    sshagent(credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Installing dependencies on remote server"

                            # Log in to the remote server and install dependencies
                            ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ubuntu@44.203.126.229 "
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
                    sshagent(credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Building the Next.js application"

                            # Log in to the remote server and build the Next.js app
                            ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ubuntu@44.203.126.229 "
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
                    sshagent(credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Restarting Apache to serve the updated app"

                            # Log in to the remote server and restart Apache
                            ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ubuntu@44.203.126.229 "
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
            echo 'Deployment pipeline failed! Please check the logs for errors.'
        }
    }
}
