export const feeds = {
  search: (limit, resolve, reject) => ({
    type: 'FEED_LIST_REQUEST',
    limit,
    resolve,
    reject
  })
};
