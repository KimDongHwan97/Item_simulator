import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

//캐릭터 생성
router.post('/characters', async (req, res, next) => {
  const { charactersName, info } = req.body;
  const character = await prisma.characters.create({
    data: {
      charactersName: charactersName,
      info: info,
      inventory: {
        create: [{ info: '인벤토리', inventoryName: '인벤' }],
      },
    },
  });

  return res.status(201).json({ data: character });
});

// 캐릭터 전체조회
router.get('/characters', async (req, res, next) => {
  const posts = await prisma.characters.findMany({
    select: {
      charactersId: true,
      charactersName: true,
      info: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: posts });
});

// 캐릭터 상세조회
router.get('/characters/:charactersId', async (req, res, next) => {
  const { charactersId } = req.params;
  const post = await prisma.characters.findFirst({
    where: { charactersId: +charactersId },
    select: {
      charactersId: true,
      charactersName: true,
      info: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: post });
});

// 캐릭터 삭제
router.delete('/characters/:charactersId', async (req, res, next) => {
  const { charactersId } = req.params;

  const post = await prisma.characters.findFirst({
    where: { charactersId: +charactersId },
  });

  if (!post)
    return res.status(404).json({ message: '캐릭터가 존재하지 않습니다.' });

  await prisma.characters.delete({ where: { charactersId: +charactersId } });

  return res.status(200).json({ data: '캐릭터가 삭제되었습니다.' });
});

export default router;
