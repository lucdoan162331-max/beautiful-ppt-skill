/** 方块类型定义 */
export const TILE = {
  COFFEE: 0,  // 冰美式
  PIE: 1,     // 画的大饼
  POT: 2,     // 飞来横锅
  PPT: 3,     // PPT折线图
  READ: 4,    // 已读不回
  EMPTY: -1,
  STUNNED: -2, // 被锅砸晕
};

export const TILE_META = {
  [TILE.COFFEE]: { emoji: '☕', name: '冰美式', color: '#6f4e37' },
  [TILE.PIE]:    { emoji: '🥞', name: '画的大饼', color: '#f5c842', glow: true },
  [TILE.POT]:    { emoji: '🍳', name: '飞来横锅', color: '#2d2d2d' },
  [TILE.PPT]:    { emoji: '📉', name: 'PPT折线图', color: '#e74c3c' },
  [TILE.READ]:   { emoji: '✓✓', name: '已读不回', color: '#4ecca3' },
};

export const GRID_SIZE = 8;
export const MATCH_MIN = 3;
export const ANIM_SPEED_NORMAL = 1;
export const ANIM_SPEED_CAFFEINE = 2; // 200% 加速

/** 消除音效文案 */
export const SFX_LINES = [
  '收到！',
  '来对齐一下',
  '这个需求的底层逻辑是……',
  '咱先拉个会',
  '辛苦再改一版',
  '好的好的',
  '我这边没问题',
  '尽快给到',
];

export const MEETING_LINES = [
  '这个需求的底层逻辑是……',
  '咱先拉个会对齐一下',
  '这个事情要形成闭环',
  '颗粒度还要再细一点',
  '能不能再卷一点',
  '老板说要降本增效',
];

/** 天降大饼 QTE */
export const MEETING_TAP_TARGET = 30;
export const MEETING_TAP_TIMEOUT = 8000; // ms

/** 心悸模式 */
export const CAFFEINE_TRIGGER = 3; // 连消 3 组冰美式
export const CAFFEINE_DURATION = 8000; // ms

/** 甩锅 */
export const POT_STUN_DURATION = 3000; // ms

/** 本地存储 key */
export const SAVE_KEY = 'worker-match3-save';
