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
                    sshagent (credentials: ['jenkins-ssh-key']) { // Use the correct Jenkins SSH credential ID
                        sh '''
                            set -x
                            echo "Running as user: $(whoami)"

                            # Use the correct SSH private key location
                            SSH_OPTIONS="-o StrictHostKeyChecking=no -i /home/ubuntu/.ssh/id_rsa"

                            # Log in to the remote server and pull changes
                            ssh $SSH_OPTIONS ubuntu@44.203.126.229 "
                                cd /var/www/html &&
                                
                                # Handle uncommitted changes to avoid conflicts
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
    }
    
    post {
        success {
            echo 'GitHub pull operation completed successfully!'
        }
        failure {
            echo 'GitHub pull operation failed! Check SSH connection and permissions.'
        }
    }
}
