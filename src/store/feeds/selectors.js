export const initialState = {
  feeds: [
    /*{
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
    {
      img: 'images/grid-list/burger-827309_640.jpg',
      title: 'Tasty burger',
      author: 'pashminu',
    }*/
  ]
};

export const getFeeds = (state = initialState) => state.feeds || [];
