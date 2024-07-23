import { defineStore } from 'pinia'

export const useVendingMachineStore = defineStore('vendingMachine', {
  state: () => ({
    balance: 0,
    logs: [],
    itemStatus: {} // 아이템 상태를 관리하는 객체
  }),
  actions: {
    insertMoney(amount) {
      this.balance += amount
      this.addLog(`${amount.toLocaleString()}원을 투입했습니다.`)
    },
    returnMoney() {
      if (this.balance > 0) {
        this.addLog(`${this.balance.toLocaleString()}원을 반환했습니다.`)
        this.balance = 0
      }
    },
    purchaseItem(price, label) {
      if (this.balance >= price) {
        this.balance -= price
        this.addLog(`${label}을(를) 구입했습니다.`)
        if (this.balance < 300) {
          this.addLog(`${this.balance.toLocaleString()}원을 반환했습니다.`)
          this.balance = 0
        }
      } else {
        this.addLog('잔액 부족')
        this.setItemStatus(label, '잔액부족')
        setTimeout(() => {
          this.resetItemStatus(label)
        }, 800) // 2초 후에 상태를 원래대로 되돌림
      }
    },
    setItemStatus(label, status) {
      this.itemStatus[label] = status
    },
    resetItemStatus(label) {
      this.itemStatus[label] = ''
    },
    addLog(message) {
      this.logs.push(message)
    },
  },
  persist: true,
})