import elasticsearch from '@elastic/elasticsearch';
import { elastic_host } from '../Config.mjs';

export default new elasticsearch.Client({ node: elastic_host });