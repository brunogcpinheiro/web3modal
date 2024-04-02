import { toast } from 'sonner'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { Button } from '@/components/ui/button'

export function EthersSignMessageTest() {
  const { address, chainId } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  async function onSignMessage() {
    try {
      if (!walletProvider || !address) {
        throw Error('user is disconnected')
      }
      const provider = new BrowserProvider(walletProvider, chainId)
      const signer = new JsonRpcSigner(provider, address)
      const signature = await signer?.signMessage('Hello Web3Modal Ethers')
      toast.success(ConstantsUtil.SigningSucceededToastTitle, {
        description: signature
      })
    } catch {
      toast.error(ConstantsUtil.SigningFailedToastTitle, {
        description: 'Failed to sign message'
      })
    }
  }

  return (
    <Button data-testid="sign-message-button" onClick={onSignMessage} variant={'secondary'}>
      Sign Message
    </Button>
  )
}
