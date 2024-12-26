pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key') // Your Jenkins SSH key ID
    }
    
    stages {
        stage('GitHub Pull') {
            steps {
                script {
                    sshagent (credentials: ['jenkins-ssh-key']) {
                        sh '''
                            set -x
                            echo "Pulling latest code from GitHub..."
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
                            echo "Installing dependencies on the remote server..."
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
                            echo "Building the Next.js application..."
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
                            echo "Restarting the application using PM2..."
                            ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY ubuntu@3.83.12.130 "
                                pm2 delete estore-app || true &&
                                cd /var/www/html &&
                                pm2 start npm --name 'estore-app' -- start &&
                                pm2 save
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
