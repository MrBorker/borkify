export const selectUserInfo = (store) => store.profile.userInfo || "";
export const selectCollaboratorInfo = (store) =>
  store.chat.collaboratorInfo || "";
export const selectChatId = (store) => store.chat.chatId || "";
