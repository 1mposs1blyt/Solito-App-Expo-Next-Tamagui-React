'use client'
import { useEffect, useState } from 'react'
import { YStack, SizableText } from 'tamagui'
export function HomeScreen() {
    const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Пока компонент не "сел" на клиенте, ничего не рендерим
  // Это уберет ошибку Mismatch на 100%
  if (!mounted) return null
  return (
    <YStack background="$gray6" p="$4">
      <SizableText color="$red10">Text</SizableText>
    </YStack>
  )
}
