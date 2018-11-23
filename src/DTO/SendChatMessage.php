<?php

declare(strict_types=1);

namespace App\DTO;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={"post"={"path"="/chat_message/send"}},
 * )
 */
class SendChatMessage
{
    /**
     * @Assert\NotBlank()
     *
     * @var string
     */
    public $author;

    /**
     * @Assert\NotBlank()
     *
     * @var string
     */
    public $message;

    /**
     * @var string
     */
    public $channel = 'general';
}
