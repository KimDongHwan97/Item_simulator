import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

//아이템 생성
router.post('/item', async (req, res, next) => {
  const { itemName, price, info } = req.body;
  const post = await prisma.item.create({
    data: {
      itemName: itemName,
      price: price,
      info: info,
    },
  });

  return res.status(201).json({ data: post });
});

// 아이템 전체조회
router.get('/item', async (req, res, next) => {
  const posts = await prisma.item.findMany({
    select: {
      itemId: true,
      inventoryId: true,
      itemName: true,
      price: true,
      info: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: posts });
});

// 아이템 상세조회
router.get('/item/:itemId', async (req, res, next) => {
  const { itemId } = req.params;
  const post = await prisma.item.findFirst({
    where: { itemId: +itemId },
    select: {
      itemId: true,
      inventoryId: true,
      itemName: true,
      price: true,
      info: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: post });
});

// 아이템 수정
router.put('/item/:itemId', async (req, res, next) => {
  const { itemId } = req.params;
  const { price, info } = req.body;

  const post = await prisma.item.findUnique({
    where: { itemId: +itemId },
  });

  if (!post)
    return res.status(404).json({ message: '아이템이 존재하지 않습니다.' });

  await prisma.item.update({
    data: { price, info },
    where: {
      itemId: +itemId,
    },
  });

  return res.status(200).json({ data: '아이템이 수정되었습니다.' });
});

// 아이템 삭제
router.delete('/item/:itemId', async (req, res, next) => {
  const { itemId } = req.params;

  const post = await prisma.item.findFirst({ where: { itemId: +itemId } });

  if (!post)
    return res.status(404).json({ message: '아이템이 존재하지 않습니다.' });

  await prisma.item.delete({ where: { itemId: +itemId } });

  return res.status(200).json({ data: '아이템이 삭제되었습니다.' });
});

export default router;
