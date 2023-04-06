import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
	service: 'somnia',
	frameworkVersion: '3',
	plugins: ['serverless-dotenv-plugin', 'serverless-esbuild', 'serverless-offline'],
	provider: {
		name: 'aws',
		runtime: 'nodejs18.x',
		stage: '${opt:stage}',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			DREAM_TABLE_NAME: 'Dreams',
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			AMAZON_ACCESS_KEY_ID: '${.env:AMAZON_ACCESS_KEY_ID}',
			AMAZON_SECRET_ACCESS_KEY: '${.env:AMAZON_SECRET_ACCESS_KEY}',
			STAGE: '${self:provider.stage}'
		}
	},
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node18',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10
		}
	},
	functions: {
		'create-dream': {
			handler: './src/application/lambdas/dream/create-dream/handler.run',
			timeout: 30,
			events: [
				{
					http: {
						method: 'POST',
						path: 'dream'
					}
				}
			]
		},
		'delete-dream-by-id': {
			handler: './src/application/lambdas/dream/delete-dream-by-id/handler.run',
			timeout: 30,
			events: [
				{
					http: {
						method: 'DELETE',
						path: 'dream/{id}'
					}
				}
			]
		},
		'find-all-dreams-by-user': {
			handler: './src/application/lambdas/dream/find-all-dreams-by-user/handler.run',
			timeout: 30,
			events: [
				{
					http: {
						method: 'GET',
						path: 'dream/user/{userId}'
					}
				}
			]
		},
		'find-dream-by-id': {
			handler: './src/application/lambdas/dream/find-dream-by-id/handler.run',
			timeout: 30,
			events: [
				{
					http: {
						method: 'GET',
						path: 'dream/{id}'
					}
				}
			]
		},
		'interpret-dream': {
			handler: './src/application/lambdas/dream/interpret-dream/handler.run',
			timeout: 300,
			events: [
				{
					http: {
						method: 'POST',
						path: 'interpret/dream/{id}'
					}
				}
			]
		},
		'update-dream-by-id': {
			handler: './src/application/lambdas/dream/update-dream-by-id.handler',
			timeout: 30,
			events: [
				{
					http: {
						method: 'PATCH',
						path: 'dream/{id}'
					}
				}
			]
		}
	},
	resources: {
		Resources: {
			DreamsTable: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: 'Dreams',
					AttributeDefinitions: [
						{
							AttributeName: 'id',
							AttributeType: 'S'
						}
					],
					KeySchema: [
						{
							AttributeName: 'id',
							KeyType: 'HASH'
						}
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 10,
						WriteCapacityUnits: 5
					}
				}
			}
		}
	}
}

module.exports = serverlessConfiguration
