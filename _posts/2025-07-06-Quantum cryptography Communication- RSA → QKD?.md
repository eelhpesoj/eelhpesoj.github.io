---
---

# 0. Summary
I think the most trending keywords in the IT industry right now are AI and quantum computing.
Obviously, AI feels much closer to us today—there are many LLM services, and multi-cloud platforms (MCPs) make them more extensible.
Multimodal AI is even enabling machines to better recognize and understand the world around us.

But we should also start preparing for the age of quantum computers.
That era is approaching fast, and it will bring massive changes.

In this post, I’ll take a look at how SSL communication could change once quantum computing becomes more widespread.

# 1. Current Cummunication - RSA
Current SSL communication is based on asymmetric cryptography using SSL certificates.
Let's briefly dive in to understand the cryptographic algorithms behind it. At this point, I will focus on the algorithms.

## Generating Public/Private Key
The keys need to be generated when we're establishing the scure channel. and in most cases, RSA is commonly using.

To do this, we need two prime numbers.

>$p, q$

And Multiply them together and assign the result to a variable called N.

>$n = pq$

And Then we plug the value of N into Euler’s totient function

>$\phi(n) = (p-1)(q-1)$

## The public encryption key 'e' is chosen

The public encryption key 'e' is chosen in the range of:
'e' should be coprime number

>$0 < e < \phi(n)$
$gcd(e,\phi(n)) =1$

In most of the cases, $e=65537$


## The private decryption key 'd' is set by Euclid Algorithm
'd' should be prime number

>$d \equiv e^{-1} \mod \phi(n)$
= $e \cdot d \equiv 1 \mod \phi(n)$

# 2. Encryption/Decryption

## Encryption
>$C = M^e \mod n$

Note: Since $M < n$, the message must be either numerically encoded or divided into blocks.

## Decryption
We can decrypt $C$ using $(d, n)$
>$M = C^d \mod n$




# 3. Quantum Computer can be threat

So far, we have examined traditional encryption methods. Currently, RSA uses a 2048-bit key, which means the key length is approximately 2 to the power of 2048. 

For classical computers, attempting to break such a key is virtually impossible and would take thousands of years. However, quantum computers operate using qubit-based computations. If qubit technology continues to advance, it is believed that quantum computers could decrypt RSA-encrypted data in just a few minutes. 

This is possible due to the phenomenon of quantum superposition, which allows quantum systems to perform computations much faster than classical systems.


# 4. New Encryption using Quantum

Currently, communication is carried out using the RSA → AES model. In simple terms, this means using asymmetric encryption (based on mathematical algorithms) to securely exchange a symmetric key, which is then used for encrypted communication.

However, as quantum computing technology advances, RSA-based mathematical encryption could be decrypted within minutes. For this reason, communication models are expected to shift toward QKD → AES in the future.

Ultimately, the goal is to securely transmit the session key, and this can be achieved through quantum key distribution (QKD), which is theoretically immune to eavesdropping.

Quantum communication leverages the principle of quantum superposition. Two endpoints compare their measurement methods and results to establish a secure channel, and then use symmetric encryption to generate a session key. Since this topic is quite extensive, I will cover it in more detail later.

That said, a major drawback is that quantum communication does not rely on traditional electrical signals—it uses photons. This means a separate, physically built photonic network is required, which incurs significant cost.

Moreover, if an attacker attempts to observe the quantum particles in transit, the channel is immediately discarded. While this is a major security advantage, it opens the door for denial-of-service (DoS) style attacks, where an adversary continually disrupts communication. As a result, we may still need to rely on traditional SSL-based communication in conjunction with quantum channels, through techniques like channel redundancy or failover. It will be interesting to see how the cybersecurity industry addresses these challenges in the coming years.