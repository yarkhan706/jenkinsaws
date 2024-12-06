pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Building on branch: ${env.BRANCH_NAME}"
                // Add your build steps here
                sh 'echo Building...'
            }
        }

        stage('Test') {
            steps {
                echo "Testing on branch: ${env.BRANCH_NAME}"
                // Add your test steps here
                sh 'echo Running tests...'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'  // Only deploy if it's the main branch
            }
            steps {
                echo "Deploying branch: ${env.BRANCH_NAME}"
                // Add your deployment steps here
                sh 'echo Deploying...'
            }
        }
    }
}
