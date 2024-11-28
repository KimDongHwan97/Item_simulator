import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

//인벤토리 생성
router.post('/inventory', async (req, res, next) => {
  const { inventoryName, info } = req.body;
  const post = await prisma.inventory.create({
    data: {
      inventoryName: inventoryName,
      info: info,
    },
  });

  return res.status(201).json({ data: post });
});

// 인벤토리 전체조회
router.get('/inventory', async (req, res, next) => {
  const posts = await prisma.inventory.findMany({
    select: {
      inventoryId: true,
      charactersId: true,
      inventoryName: true,
      info: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: posts });
});

// 인벤토리 상세조회
router.get('/inventory/:inventoryId', async (req, res, next) => {
  const { inventoryId } = req.params;
  const post = await prisma.inventory.findFirst({
    where: { inventoryId: +inventoryId },
    select: {
      inventoryId: true,
      charactersId: true,
      inventoryName: true,
      info: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: post });
});

// 인벤토리 수정
router.put('/inventory/:inventoryId', async (req, res, next) => {
  const { inventoryId } = req.params;
  const { inventoryName, info } = req.body;

  const post = await prisma.inventory.findUnique({
    where: { inventoryId: +inventoryId },
  });

  if (!post)
    return res.status(404).json({ message: '인벤토리가 존재하지 않습니다.' });

  await prisma.inventory.update({
    data: { inventoryName, info },
    where: {
      inventoryId: +inventoryId,
    },
  });

  return res.status(200).json({ data: '인벤토리가 수정되었습니다.' });
});

// 인벤토리 삭제
router.delete('/inventory/:inventoryId', async (req, res, next) => {
  const { inventoryId } = req.params;

  const post = await prisma.inventory.findFirst({
    where: { inventoryId: +inventoryId },
  });

  if (!post)
    return res.status(404).json({ message: '인벤토리가 존재하지 않습니다.' });

  await prisma.inventory.delete({ where: { inventoryId: +inventoryId } });

  return res.status(200).json({ data: '인벤토리가 삭제되었습니다.' });
});

export default router;
