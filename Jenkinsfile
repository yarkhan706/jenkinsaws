pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Deploy') {
            steps {
                script {
                    // Add error handling
                    try {
                        sh '''
                            set -x  # Enable debug mode
                            whoami  # Check which user is executing
                            ssh -v -o StrictHostKeyChecking=no ubuntu@44.203.126.229 '
                                cd /var/www/html &&
                                sudo git pull origin main
                            '
                        '''
                    } catch (err) {
                        echo "Failed to deploy: ${err}"
                        throw err
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
