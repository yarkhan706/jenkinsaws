pipeline {
    agent any
    
    environment {
        SSH_CREDENTIALS = 'apache-ssh-key'
        SERVER_IP = '44.203.126.229'
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Deploy to Apache') {
            steps {
                sshagent([SSH_CREDENTIALS]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} '
                            cd /var/www/html
                            sudo git pull origin main
                        '
                    '''
                }
                echo 'Deployment completed!'
            }
        }
    }
    
    post {
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
