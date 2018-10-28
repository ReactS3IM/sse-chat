<?php

declare(strict_types=1);

namespace App\DTO;

use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource(
 *     itemOperations={},
 *     collectionOperations={"post"={"path"="/chat_message/send"}},
 * )
 */
class SendChatMessage
{
    /**
     * @var string
     */
    public $author;

    /**
     * @var string
     */
    public $message;
}
