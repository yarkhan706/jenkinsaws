pipeline {
    agent any
    
    environment {
        // Update this to match your Jenkins credential ID
        SSH_CREDENTIALS = 'apache-ssh-key'
        SERVER_IP = '44.203.126.229'
        DEPLOY_PATH = '/var/www/html'
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning Repository...'
                cleanWs()
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the Project...'
                // Add your build steps here
            }
        }
        
        stage('Debug Info') {
            steps {
                sh '''
                    pwd
                    ls -la
                    echo "Workspace contents:"
                    ls -R
                '''
            }
        }
        
        stage('Deploy to Apache') {
            steps {
                echo 'Starting deployment to Apache...'
                sshagent([SSH_CREDENTIALS]) {
                    sh '''
                        # Debug SSH connection
                        echo "Testing SSH connection..."
                        ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} 'echo "SSH connection successful"'
                        
                        # Debug source directory
                        echo "Current directory contents:"
                        ls -la
                        
                        # Create build directory if it doesn't exist (adjust path as needed)
                        echo "Creating directory if it doesn't exist..."
                        ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} 'sudo mkdir -p /var/www/html'
                        
                        # Set permissions
                        echo "Setting permissions..."
                        ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} 'sudo chown -R ubuntu:ubuntu /var/www/html'
                        
                        # Deploy files - with verbose flag for debugging
                        echo "Copying files..."
                        scp -rv * ubuntu@${SERVER_IP}:/var/www/html/
                        
                        # Reset permissions after copy
                        echo "Resetting permissions..."
                        ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} 'sudo chown -R www-data:www-data /var/www/html'
                        
                        # Verify deployment
                        echo "Verifying deployed files..."
                        ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} 'ls -la /var/www/html'
                    '''
                }
                echo 'Deployment completed!'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution finished.'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
