import {ESTransport} from "./ESTransport";

export class MockESTransport extends ESTransport {

  search(query){
    return Promise.resolve({
      size: query.size,
      from: query.from,
      hits: {
        hits: []
      }
    })
  }
}
