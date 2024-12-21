pipeline {
    agent any

    triggers {
        githubPush() // Trigger the pipeline on a GitHub push event
    }

    stages {
        stage('Setup SSH Credentials') {
            steps {
                script {
                    // Ensures the Jenkins workspace has access to the SSH key
                    sshagent(['jenkins-ssh-key']) {
                        sh 'echo "SSH credentials loaded."'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Add error handling to ensure pipeline fails gracefully
                    try {
                        sh '''
                            set -x  # Enable debug mode for better visibility
                            echo "Current user: $(whoami)"
                            
                            # Connect to the remote server and pull the latest code
                            ssh -o StrictHostKeyChecking=no ubuntu@44.203.126.229 '
                                cd /var/www/html &&
                                git status &&
                                git pull origin main
                            '
                        '''
                    } catch (err) {
                        echo "Deployment failed due to the following error: ${err}"
                        throw err
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment was successful! The latest code is now on the Apache server.'
        }
        failure {
            echo 'Deployment failed! Please check the Jenkins logs and SSH connection.'
        }
    }
}
