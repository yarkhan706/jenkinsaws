pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key')  // Ensure this matches your Jenkins SSH credential ID
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
                    // Ensure that the private key is loaded correctly with ssh-agent
                    sshagent (credentials: ['jenkins-ssh-key']) {  // Use correct credentials ID
                        sh '''
                            set -x  # Enable debug mode
                            whoami  # Check which user is executing

                            # Set git to consider the directory safe
                            ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/id_rsa ubuntu@44.203.126.229 "git config --global --add safe.directory /var/www/html"

                            # Run the git pull command
                            ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/id_rsa ubuntu@44.203.126.229 '
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
