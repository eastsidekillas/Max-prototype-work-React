const avatarTones = [
  'bg-[#E8ECFF] text-[#5269C8]',
  'bg-[#E8F5EF] text-[#2A866F]',
  'bg-[#FFF0E5] text-[#B96C38]',
  'bg-[#F1E9FF] text-[#7953B5]',
  'bg-[#E7F2F7] text-[#3B7B91]',
]

export function ChatAvatar({ title }: { title: string }) {
  const letter = title.trim().slice(0, 1).toUpperCase() || '?'
  const index = [...title].reduce((sum, char) => sum + char.charCodeAt(0), 0) % avatarTones.length

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold ${avatarTones[index]}`}
      aria-hidden="true"
    >
      {letter}
    </div>
  )
}
