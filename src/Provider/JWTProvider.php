<?php

declare(strict_types=1);

namespace App\Provider;

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer;

class JWTProvider
{
    /**
     * @var Signer
     */
    private $signer;

    /**
     * @var string
     */
    private $jwtKey;

    public function __construct(
        Signer $signer,
        string $jwtKey
    )
    {
        $this->signer     = $signer;
        $this->jwtKey     = $jwtKey;
    }

    public function getToken(): string
    {
        return (string)(new Builder)
            ->set('mercure', [
                'subscribe' => ['*'],
                'publish'   => ['*'],
            ])
            ->sign($this->signer, $this->jwtKey)
            ->getToken();
    }
}
