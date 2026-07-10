import { TILE } from './config.js';

export const LEVELS = [
  {
    id: 1,
    name: '早安元气弹',
    desc: '消除 30 个方块，热热身～',
    goal: { type: 'clear_total', target: 30 },
    moves: 25,
    stressPerMove: 2,
    tileWeights: [20, 20, 15, 25, 20],
    tip: '滑动交换相邻方块，三个以上连线就爆掉！',
  },
  {
    id: 2,
    name: '灵感曲线派对',
    desc: '消除 20 个灵感曲线',
    goal: { type: 'clear_type', tile: TILE.PPT, target: 20 },
    moves: 22,
    stressPerMove: 3,
    tileWeights: [15, 15, 15, 35, 20],
    tip: '彩色折线图里藏着小灵感，消掉它们超解压！',
  },
  {
    id: 3,
    name: '消息小精灵',
    desc: '消除 15 个已读不回，能量槽不超过 60',
    goal: { type: 'clear_type_stress', tile: TILE.READ, target: 15, maxStress: 60 },
    moves: 20,
    stressPerMove: 3,
    tileWeights: [15, 15, 15, 20, 35],
    tip: '绿色气泡是对勾消息，别让能量槽涨太高哦',
  },
  {
    id: 4,
    name: '美式加速时刻',
    desc: '触发 1 次续命加速（连消 3 组美式）',
    goal: { type: 'trigger_caffeine', target: 1 },
    moves: 25,
    stressPerMove: 2,
    tileWeights: [40, 15, 15, 15, 15],
    tip: '连续消除 3 组续命美式，进入超速爽感模式！',
  },
  {
    id: 5,
    name: '锅锅弹射乐园',
    desc: '成功弹射锅锅 3 次',
    goal: { type: 'pot_throw', target: 3 },
    moves: 22,
    stressPerMove: 3,
    tileWeights: [15, 15, 35, 20, 15],
    tip: '把飞天锅锅移到边缘，它会弹出去晕乎乎撞一下～',
  },
  {
    id: 6,
    name: '大饼泡泡雨',
    desc: '触发 1 次大饼泡泡（一次消除 5+ 大饼）',
    goal: { type: 'pie_big_match', target: 1 },
    moves: 24,
    stressPerMove: 3,
    tileWeights: [15, 35, 15, 20, 15],
    tip: '一次凑齐 5 个黄金大饼，金色泡泡雨降临！',
  },
  {
    id: 7,
    name: '终极解压之夜',
    desc: '达成 5000 分，能量槽低于 80',
    goal: { type: 'score_stress', target: 5000, maxStress: 80 },
    moves: 30,
    stressPerMove: 2,
    tileWeights: [20, 20, 20, 20, 20],
    tip: '最后一关！你的玩法会决定专属结局～',
  },
];

export const ENDINGS = [
  {
    id: 'on_time',
    title: '松弛感大师',
    badge: '🌈',
    desc: '能量槽控制得刚刚好，全程轻轻松松，治愈力拉满。',
    weight: (s) => (s.maxStress < 50 && s.levelsCleared >= 7 ? 100 : 0),
  },
  {
    id: 'pot_master',
    title: '锅锅弹射王',
    badge: '🍳',
    desc: '飞天锅锅指哪打哪，弹射轨迹堪比杂技表演。',
    weight: (s) => (s.potThrows >= 8 ? 90 + s.potThrows : 0),
  },
  {
    id: 'caffeine_warrior',
    title: '超速小马达',
    badge: '☕',
    desc: '续命美式喝到爽，手指快到出残影，连击停不下来。',
    weight: (s) => (s.caffeineTriggers >= 3 ? 85 + s.caffeineTriggers * 5 : 0),
  },
  {
    id: 'pie_victim',
    title: '泡泡收割机',
    badge: '🥞',
    desc: '金色大饼泡泡雨见一次戳一次，解压手感已刻进 DNA。',
    weight: (s) => (s.bigPieTriggers >= 2 ? 88 : s.bigPieTriggers >= 1 ? 60 : 0),
  },
  {
    id: 'spirit_quit',
    title: '硬核通关侠',
    badge: '💪',
    desc: '能量槽差点爆表但还是通关了——这股韧劲，佩服！',
    weight: (s) => (s.maxStress >= 90 && s.levelsCleared >= 7 ? 95 : 0),
  },
  {
    id: '卷王',
    title: '分数收割者',
    badge: '👑',
    desc: '分数高到离谱，combo 链长到屏幕装不下。',
    weight: (s) => (s.totalScore >= 15000 ? 92 : s.totalScore >= 10000 ? 70 : 0),
  },
  {
    id: 'zen',
    title: '佛系治愈官',
    badge: '🧘',
    desc: '不追大招、不硬刚，安安静静消消乐，内心一片祥和。',
    weight: (s) => (
      s.levelsCleared >= 7 &&
      s.potThrows <= 2 &&
      s.caffeineTriggers <= 1 &&
      s.bigPieTriggers === 0 ? 80 : 0
    ),
  },
  {
    id: 'all_rounder',
    title: '全能解压王',
    badge: '🎭',
    desc: '美式、大饼、锅锅、曲线、消息——每种爽感你都体验了个遍！',
    weight: (s) => (
      s.caffeineTriggers >= 1 &&
      s.potThrows >= 3 &&
      s.bigPieTriggers >= 1 &&
      s.levelsCleared >= 7 ? 100 : 0
    ),
  },
  {
    id: 'default',
    title: '快乐打工人',
    badge: '✨',
    desc: '没有花哨称号，但每一下消除都是真实的小快乐。',
    weight: () => 10,
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
    case 'clear_type_stress': return `消除 ${g.target} 个${tileName(g.tile)}，能量≤${g.maxStress}`;
    case 'trigger_caffeine': return `触发续命加速 ×${g.target}`;
    case 'pot_throw': return `锅锅弹射 ×${g.target}`;
    case 'pie_big_match': return `触发大饼泡泡 ×${g.target}`;
    case 'score_stress': return `得分 ${g.target}，能量≤${g.maxStress}`;
    default: return level.desc;
  }
}

function tileName(t) {
  const names = ['续命美式', '黄金大饼', '飞天锅锅', '灵感曲线', '已读不回'];
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
