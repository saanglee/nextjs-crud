export const mapUserData = (user: any) => {
  // FIXME any
  const { uid, email } = user;
  return {
    id: uid,
    email,
    // token: xa,
    // name: displayName,
    // profilePic: photoUrl
  };
};
