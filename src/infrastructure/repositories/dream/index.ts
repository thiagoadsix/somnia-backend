import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Dream } from '@domain/entities/dream'
import { DreamRepositoryContract } from '@domain/usecases/contracts/repositories/dream.repository.contract'

export class DreamRepository implements DreamRepositoryContract {
	private readonly tableName: string
	private readonly documentClient: DocumentClient

	constructor(tableName: string) {
		this.tableName = tableName
		this.documentClient = new DynamoDB.DocumentClient({
			endpoint: 'http://localhost:4566',
			accessKeyId: 'fakeAccessKeyId',
			secretAccessKey: 'fakeSecretAccessKey'
		})
	}

	async save(dream: Dream): Promise<void> {
		const params: DocumentClient.PutItemInput = {
			TableName: this.tableName,
			Item: dream
		}

		await this.documentClient.put(params).promise()
	}

	async updateById(id: string, data: Partial<Dream>): Promise<void> {
		const params: DocumentClient.UpdateItemInput = {
			TableName: this.tableName,
			Key: { id },
			UpdateExpression: 'set',
			ExpressionAttributeNames: {},
			ExpressionAttributeValues: {}
		}

		const updateFields = [
			{ field: 'title', attr: '#title', value: ':title' },
			{ field: 'dream', attr: '#dream', value: ':dream' },
			{ field: 'dreamInterpreted', attr: '#dreamInterpreted', value: ':dreamInterpreted' },
			{ field: 'tags', attr: '#tags', value: ':tags' },
			{ field: 'liked', attr: '#liked', value: ':liked' }
		]

		updateFields.forEach(({ field, attr, value }) => {
			if (data[field] !== undefined) {
				params.UpdateExpression += ` ${attr} = ${value},`

				if (params && params.ExpressionAttributeNames) {
					params.ExpressionAttributeNames[attr] = field
				}

				if (params && params.ExpressionAttributeValues) {
					params.ExpressionAttributeValues[value] = data[field]
				}
			}
		})

		if (params?.UpdateExpression?.endsWith(',')) {
			params.UpdateExpression = params.UpdateExpression.slice(0, -1)
		}

		await this.documentClient.update(params).promise()
	}

	async deleteById(id: string): Promise<void> {
		const params: DocumentClient.DeleteItemInput = {
			TableName: this.tableName,
			Key: { id }
		}

		await this.documentClient.delete(params).promise()
	}

	async findById(id: string): Promise<Dream> {
		const params: DocumentClient.GetItemInput = {
			TableName: this.tableName,
			Key: { id }
		}

		const result = await this.documentClient.get(params).promise()

		return result.Item as Dream
	}

	async findAll(): Promise<Dream[]> {
		const params: DocumentClient.ScanInput = {
			TableName: this.tableName
		}

		const result = await this.documentClient.scan(params).promise()

		return result.Items as Dream[]
	}
}
