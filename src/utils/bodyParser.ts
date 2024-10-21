import { IncomingMessage } from 'node:http';

export const parseRequestBody = (requestBody: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';
    requestBody.on('data', (chunk) => {
      body += chunk;
    })
    requestBody.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody)
      } catch (e) {
        reject(e);
      }
    })
    requestBody.on('error', (err) => {
      reject(err);
    })
  })
}