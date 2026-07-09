import { TILE } from './config.js';

/**
 * 关卡配置
 * type: score | clear_type | combo_coffee | pot_throw | pie_match5 | survive | mixed
 */
export const LEVELS = [
  {
    id: 1,
    name: '周一晨会',
    desc: '消除 30 个任意方块，熟悉手感',
    goal: { type: 'clear_total', target: 30 },
    moves: 25,
    stressPerMove: 2,
    tileWeights: [20, 20, 15, 25, 20], // coffee,pie,pot,ppt,read
    tip: '滑动相邻方块交换位置，三个以上连线即可消除',
  },
  {
    id: 2,
    name: '需求对齐地狱',
    desc: '消灭 20 个 PPT 折线图',
    goal: { type: 'clear_type', tile: TILE.PPT, target: 20 },
    moves: 22,
    stressPerMove: 3,
    tileWeights: [15, 15, 15, 35, 20],
    tip: '业绩永远在走下坡路，狠狠消除它们',
  },
  {
    id: 3,
    name: '已读不回之夜',
    desc: '消除 15 个已读不回，怨气值不超过 60',
    goal: { type: 'clear_type_stress', tile: TILE.READ, target: 15, maxStress: 60 },
    moves: 20,
    stressPerMove: 4,
    tileWeights: [15, 15, 15, 20, 35],
    tip: '绿色对勾是已读不回，注意控制怨气值',
  },
  {
    id: 4,
    name: '续命咖啡因',
    desc: '触发 1 次心悸模式（连消 3 组冰美式）',
    goal: { type: 'trigger_caffeine', target: 1 },
    moves: 25,
    stressPerMove: 2,
    tileWeights: [40, 15, 15, 15, 15],
    tip: '连续消除 3 组冰美式，进入咖啡因过量状态',
  },
  {
    id: 5,
    name: '甩锅大战',
    desc: '成功甩锅 3 次',
    goal: { type: 'pot_throw', target: 3 },
    moves: 22,
    stressPerMove: 3,
    tileWeights: [15, 15, 35, 20, 15],
    tip: '把飞来横锅移到棋盘边缘，它会砸向隔壁格子',
  },
  {
    id: 6,
    name: '大饼围城',
    desc: '触发 1 次天降大饼（一次消除 5+ 大饼）',
    goal: { type: 'pie_big_match', target: 1 },
    moves: 24,
    stressPerMove: 3,
    tileWeights: [15, 35, 15, 20, 15],
    tip: '一次凑齐 5 个画的大饼，迎接老板虚影',
  },
  {
    id: 7,
    name: '终极打工夜',
    desc: '达成 5000 分，怨气值低于 80',
    goal: { type: 'score_stress', target: 5000, maxStress: 80 },
    moves: 30,
    stressPerMove: 2,
    tileWeights: [20, 20, 20, 20, 20],
    tip: '最后一关，你的打法将决定最终结局',
  },
];

/**
 * 开放式结局 — 根据全局统计判定，可多个候选取最高权重
 */
export const ENDINGS = [
  {
    id: 'on_time',
    title: '准时下班侠',
    badge: '🏃',
    desc: '怨气控制得当，在精神崩溃前全身而退。你是职场罕见的清流。',
    weight: (s) => (s.maxStress < 50 && s.levelsCleared >= 7 ? 100 : 0),
  },
  {
    id: 'pot_master',
    title: '甩锅宗师',
    badge: '🍳',
    desc: '横锅所到之处，寸草不生。你已经把甩锅练成了艺术。',
    weight: (s) => (s.potThrows >= 8 ? 90 + s.potThrows : 0),
  },
  {
    id: 'caffeine_warrior',
    title: '咖啡因战神',
    badge: '☕',
    desc: '心悸模式是你的常态，冰美式是你的血液。HR 建议你做个心电图。',
    weight: (s) => (s.caffeineTriggers >= 3 ? 85 + s.caffeineTriggers * 5 : 0),
  },
  {
    id: 'pie_victim',
    title: '大饼受害人',
    badge: '🥞',
    desc: '老板的虚影在你脑海中挥之不去。你终于明白，大饼不能吃，只能躲。',
    weight: (s) => (s.bigPieTriggers >= 2 ? 88 : s.bigPieTriggers >= 1 ? 60 : 0),
  },
  {
    id: 'spirit_quit',
    title: '精神离职',
    badge: '😶',
    desc: '人还在工位，魂已出走。怨气值爆表但你硬是扛完了——这本身就是一种胜利。',
    weight: (s) => (s.maxStress >= 90 && s.levelsCleared >= 7 ? 95 : 0),
  },
  {
    id: '卷王',
    title: '卷王之身',
    badge: '👑',
    desc: '分数碾压一切，消除速度让同事望尘莫及。老板看了你的 KPI 都沉默。',
    weight: (s) => (s.totalScore >= 15000 ? 92 : s.totalScore >= 10000 ? 70 : 0),
  },
  {
    id: 'zen',
    title: '佛系打工人',
    badge: '🧘',
    desc: '不甩锅、不心悸、不大饼。你用最平静的方式消化了所有怨气。',
    weight: (s) => (
      s.levelsCleared >= 7 &&
      s.potThrows <= 2 &&
      s.caffeineTriggers <= 1 &&
      s.bigPieTriggers === 0
        ? 80
        : 0
    ),
  },
  {
    id: 'all_rounder',
    title: '全能社畜',
    badge: '🎭',
    desc: '心悸、甩锅、大饼、已读不回——你体验了打工人的全部精神状态。真实得让人心疼。',
    weight: (s) => (
      s.caffeineTriggers >= 1 &&
      s.potThrows >= 3 &&
      s.bigPieTriggers >= 1 &&
      s.levelsCleared >= 7
        ? 100
        : 0
    ),
  },
  {
    id: 'default',
    title: '普通打工人',
    badge: '💼',
    desc: '没有惊天动地的传说，但每一天你都认真消怨。这就够了。',
    weight: () => 10, // fallback
  },
];

export function pickEnding(stats) {
  let best = ENDINGS[ENDINGS.length - 1];
  let bestWeight = 0;
  for (const ending of ENDINGS) {
    const w = ending.weight(stats);
    if (w > bestWeight) {
      bestWeight = w;
      best = ending;
    }
  }
  return best;
}

export function getGoalText(level) {
  const g = level.goal;
  switch (g.type) {
    case 'clear_total': return `消除 ${g.target} 个方块`;
    case 'clear_type': return `消除 ${g.target} 个${tileName(g.tile)}`;
    case 'clear_type_stress': return `消除 ${g.target} 个${tileName(g.tile)}，怨气≤${g.maxStress}`;
    case 'trigger_caffeine': return `触发心悸模式 ×${g.target}`;
    case 'pot_throw': return `甩锅成功 ×${g.target}`;
    case 'pie_big_match': return `触发天降大饼 ×${g.target}`;
    case 'score_stress': return `得分 ${g.target}，怨气≤${g.maxStress}`;
    default: return level.desc;
  }
}

function tileName(t) {
  const names = ['冰美式', '画的大饼', '飞来横锅', 'PPT折线图', '已读不回'];
  return names[t] || '方块';
}

export function checkLevelGoal(level, progress) {
  const g = level.goal;
  switch (g.type) {
    case 'clear_total':
      return progress.clearedTotal >= g.target;
    case 'clear_type':
      return (progress.clearedByType[g.tile] || 0) >= g.target;
    case 'clear_type_stress':
      return (
        (progress.clearedByType[g.tile] || 0) >= g.target &&
        progress.stress <= g.maxStress
      );
    case 'trigger_caffeine':
      return progress.caffeineTriggers >= g.target;
    case 'pot_throw':
      return progress.potThrows >= g.target;
    case 'pie_big_match':
      return progress.bigPieMatches >= g.target;
    case 'score_stress':
      return progress.score >= g.target && progress.stress <= g.maxStress;
    default:
      return false;
  }
}
