export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "SenhaTeste") {
            return "hash-SenhaTeste"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "SenhaTeste" && hash == "hash-SenhaTeste") {
            return true
        }

        return false
    }
}