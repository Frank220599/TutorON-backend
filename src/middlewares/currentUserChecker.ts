const currentUserChecker = async (action) => {
  return   action.request.user;
};

export default currentUserChecker