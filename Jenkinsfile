pipeline {
    agent any

    environment {
        // Define any global environment variables here
        PROJECT_NAME = "jenkinsaws"
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    echo "Running on branch: ${env.BRANCH_NAME}"
                }
            }
        }

        stage('Build') {
            when {
                expression {
                    env.BRANCH_NAME != 'main' && env.BRANCH_NAME != 'master'
                }
            }
            steps {
                echo "Building branch: ${env.BRANCH_NAME}"
                // Add your build commands here, e.g.:
                sh './gradlew build'  // Example for a Gradle project
            }
        }

        stage('Test') {
            steps {
                echo "Running tests on branch: ${env.BRANCH_NAME}"
                // Add test steps here
                sh './gradlew test'  // Example for a Gradle project
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                echo "Deploying branch: ${env.BRANCH_NAME} to Staging"
                // Add deployment steps for Staging
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main' || branch 'master'
            }
            steps {
                echo "Deploying branch: ${env.BRANCH_NAME} to Production"
                // Add deployment steps for Production
            }
        }
    }

    post {
        always {
            echo "Cleaning up workspace"
            cleanWs()
        }
        success {
            echo "Pipeline succeeded on branch: ${env.BRANCH_NAME}"
        }
        failure {
            echo "Pipeline failed on branch: ${env.BRANCH_NAME}"
        }
    }
}
