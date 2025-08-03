//data was collected by JS manipulations with /api/*category*.json
const catalogueValidIDs = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
  130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
  145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
  160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
  175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
  190, 191, 192, 193, 194,
] as const;

enum PhoneValidNameSpaceIDs {
  ELEVEN = 'apple-iphone-11',
  ELEVEN_PRO = 'apple-iphone-11-pro',
  ELEVEN_PRO_MAX = 'apple-iphone-11-pro-max',
  SEVEN = 'apple-iphone-7',
  SEVEN_PLUS = 'apple-iphone-7-plus',
  EIGHT = 'apple-iphone-8',
  XR = 'apple-iphone-xr',
  XS = 'apple-iphone-xs',
  XS_MAX = 'apple-iphone-xs-max',
  FOURTEEN = 'apple-iphone-14',
  FOURTEEN_PRO = 'apple-iphone-14-pro',
  TWELVE = 'apple-iphone-12',
  THIRTEEN_MINI = 'apple-iphone-13-mini',
  THIRTEEN_PRO_MAX = 'apple-iphone-13-pro-max',
}

enum TabletValidNameSpaceIDs {
  IPAD_PRO = 'apple-ipad-pro-11-2021',
  IPAD_AIR_FOURTH = 'apple-ipad-air-4th-gen',
  IPAD_AIR_SIX = 'apple-ipad-mini-6th-gen',
  IPAD_TEN = 'apple-ipad-10-2-2020',
  IPAD_MINI = 'apple-ipad-mini-5th-gen',
}

enum AccessoriesValidNameSpaceIDs {
  WATCH_THREE = 'apple-watch-series-3',
  WATCH_SIXTH = 'apple-watch-series-6',
  WATCH_FIFTH = 'apple-watch-series-5',
  WATCH_FOURTH = 'apple-watch-series-4',
  WATCH_SE = 'apple-watch-se',
}

enum GlobalValidNameSpaceIDs {
  ELEVEN = 'apple-iphone-11',
  ELEVEN_PRO = 'apple-iphone-11-pro',
  ELEVEN_PRO_MAX = 'apple-iphone-11-pro-max',
  SEVEN = 'apple-iphone-7',
  SEVEN_PLUS = 'apple-iphone-7-plus',
  EIGHT = 'apple-iphone-8',
  XR = 'apple-iphone-xr',
  XS = 'apple-iphone-xs',
  XS_MAX = 'apple-iphone-xs-max',
  FOURTEEN = 'apple-iphone-14',
  FOURTEEN_PRO = 'apple-iphone-14-pro',
  TWELVE = 'apple-iphone-12',
  THIRTEEN_MINI = 'apple-iphone-13-mini',
  THIRTEEN_PRO_MAX = 'apple-iphone-13-pro-max',
  IPAD_PRO = 'apple-ipad-pro-11-2021',
  IPAD_AIR_FOURTH = 'apple-ipad-air-4th-gen',
  IPAD_AIR_SIX = 'apple-ipad-mini-6th-gen',
  IPAD_TEN = 'apple-ipad-10-2-2020',
  IPAD_MINI = 'apple-ipad-mini-5th-gen',
  WATCH_THREE = 'apple-watch-series-3',
  WATCH_SIXTH = 'apple-watch-series-6',
  WATCH_FIFTH = 'apple-watch-series-5',
  WATCH_FOURTH = 'apple-watch-series-4',
  WATCH_SE = 'apple-watch-se',
}

export {
  catalogueValidIDs,
  PhoneValidNameSpaceIDs,
  TabletValidNameSpaceIDs,
  AccessoriesValidNameSpaceIDs,
  GlobalValidNameSpaceIDs,
};
