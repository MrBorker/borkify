import {
  ChatsSidebar,
  MapSidebar,
  MatchesSidebar,
  ProfileSidebar,
  SettingsSidebar,
} from "src/icons";

export const sidebar = [
  { link: "/admin", icon: <ProfileSidebar />, text: "Profile" },
  { link: "/admin/matches", icon: <MatchesSidebar />, text: "Find matches" },
  { link: "/admin/chats", icon: <ChatsSidebar />, text: "Who likes me" },
  // { link: "/admin/map", icon: <MapSidebar />, text: "On map" },
  { link: "/admin/settings", icon: <SettingsSidebar />, text: "Settings" },
];
