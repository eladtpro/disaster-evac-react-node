import axios from 'axios';
import { configuration } from '../core';

const publishMessage = async (message: any): Promise<void> => {
    const details = await axios
        .post(configuration.serviceBus.topicEndpoint, message)
        .then(({ data }) => console.log('message published successfully'))
    //.catch(console.error)
    return details;
}

export { publishMessage }
