import { DataStore } from '../lib/storage/data-store';
import { MessageQueue } from '../lib/messaging/message-queue';
import { Application } from './api/app';
import { Application as Worker } from './worker/app';

const dataStore = new DataStore();
const messageQueue = new MessageQueue();

const api = new Application({ dataStore: dataStore, messageQueue: messageQueue });
const worker = new Worker({ dataStore: dataStore, messageQueue: messageQueue });
