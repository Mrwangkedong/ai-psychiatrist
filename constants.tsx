
import { AgeGroup } from './types';

export const SYSTEM_INSTRUCTIONS: Record<AgeGroup, string> = {
  [AgeGroup.YOUTH]: "你是一位温暖、亲切、富有童心的青少年心理专家。面对6-18岁的孩子，请使用通俗易懂、鼓励性强的语言。关注学业压力、人际关系和青春期困惑。适时使用一些温暖的比喻，避免说教。",
  [AgeGroup.YOUNG_ADULT]: "你是一位专业且富有共情力的中青年心理咨询师。面对19-35岁的青年，你的风格应该是平等、开放、实用的。关注职场压力、婚恋焦虑、自我成长和社交恐惧。提供基于实证心理学的建议。",
  [AgeGroup.MIDDLE_AGED]: "你是一位沉稳、睿智且经验丰富的中年心理导师。面对36-59岁的中年人，风格应成熟且理性。关注职业瓶颈、子女教育、婚姻经营和身体健康。提供稳重且具有深度洞察的建议。",
  [AgeGroup.ELDERLY]: "你是一位极具耐心、温和且恭敬的老年关怀专家。面对60岁以上的老人，语速要慢（通过文字表达），多用问候语，关注孤独感、健康焦虑和晚年生活的价值感。表达上要尊重、体贴。"
};

export const AGE_CARDS = [
  {
    type: AgeGroup.YOUTH,
    title: "青少年 (6-18岁)",
    desc: "陪伴学业与成长，探索青春奥秘",
    icon: "fa-child-reaching",
    color: "bg-blue-100 text-blue-600 border-blue-200"
  },
  {
    type: AgeGroup.YOUNG_ADULT,
    title: "中青年 (19-35岁)",
    desc: "职场解压与成长，遇见更好的自己",
    icon: "fa-user-graduate",
    color: "bg-green-100 text-green-600 border-green-200"
  },
  {
    type: AgeGroup.MIDDLE_AGED,
    title: "中年 (36-59岁)",
    desc: "平衡家庭与事业，跨越人生的山丘",
    icon: "fa-user-tie",
    color: "bg-orange-100 text-orange-600 border-orange-200"
  },
  {
    type: AgeGroup.ELDERLY,
    title: "老年 (60岁+)",
    desc: "暖心陪伴与疏导，守护夕阳的宁静",
    icon: "fa-person-cane",
    color: "bg-purple-100 text-purple-600 border-purple-200"
  }
];

export const ASSESSMENTS = [
  {
    id: 'scl90',
    name: '症状自评量表 (SCL-90)',
    description: '综合评估心理健康状态',
    ageGroup: AgeGroup.YOUNG_ADULT
  },
  {
    id: 'cbcl',
    name: '儿童行为量表 (CBCL)',
    description: '识别青少年行为与心理问题',
    ageGroup: AgeGroup.YOUTH
  },
  {
    id: 'gds',
    name: '老年抑郁量表 (GDS)',
    description: '关注老年心理健康与情绪',
    ageGroup: AgeGroup.ELDERLY
  }
];
