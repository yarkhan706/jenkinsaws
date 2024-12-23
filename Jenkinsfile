pipeline {
    agent any
    
    triggers {
        githubPush() // Trigger pipeline on a GitHub push event
    }
    
    environment {
        SSH_PRIVATE_KEY = credentials('jenkins-ssh-key') // Replace with your Jenkins SSH credential ID
    }
    
    stages {
        stage('GitHub Pull') {
            steps {
                script {
                    // Using ssh-agent to manage the private key for SSH
                    sshagent (credentials: ['jenkins-ssh-key']) { // Use your Jenkins SSH credentials ID
                        sh '''
                            # Debugging information
                            set -x
                            echo "Running as user: $(whoami)"

                            # Define the SSH options for secure and non-interactive login
                            SSH_OPTIONS="-o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/id_rsa"

                            # Login to the remote server and execute the git pull command
                            ssh $SSH_OPTIONS ubuntu@44.203.126.229 "
                                cd /var/www/html &&
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
