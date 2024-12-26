pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key') // Replace with your actual Jenkins SSH credential ID
    }

    stages {
        stage('GitHub Pull') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Pulling latest code from GitHub"
                            ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY ubuntu@3.83.12.130 "
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
                            echo "Installing dependencies"
                            ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY ubuntu@3.83.12.130 "
                                cd /var/www/html &&
                                npm install
                            "
                        '''
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Building the application"
                            ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY ubuntu@3.83.12.130 "
                                cd /var/www/html &&
                                npm run build
                            "
                        '''
                    }
                }
            }
        }

        stage('Restart Application') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Restarting the application with PM2"
                            ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY ubuntu@3.83.12.130 "
                                pm2 stop estore-app || true &&
                                pm2 start npm --name 'estore-app' -- start
                            "
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}
