pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        // Specify the path of the private key (stored in Jenkins credentials)
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key') // Replace 'jenkins-ssh-key' with your actual Jenkins credential ID
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Deploy to Apache') {
            steps {
                script {
                    // Use the SSH key to deploy to Apache server
                    sshagent (credentials: ['jenkins-ssh-key']) { // Replace with your credentials ID
                        sh '''
                            set -x  # Enable debug mode
                            whoami  # Check which user is executing
                            ssh -o StrictHostKeyChecking=no ubuntu@44.203.126.229 '
                                cd /var/www/html && 
                                sudo git pull origin main
                            '
                        '''
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed! Check SSH connection and permissions.'
        }
    }
}
