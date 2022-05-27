import { IsArray, IsMongoId } from 'class-validator';
import { ApiProperty, getSchemaPath, OmitType, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { AccountBase, DiscordAccountResponseDto, EthereumAccountResponseDto } from '../account/account.dtos';
import { Type } from 'class-transformer';
import {PollOptionDto} from "../poll/poll.dtos";

export class UserResponseDto {

    @IsMongoId()
    @ApiProperty({
        description: 'Governator user id - (auto generated if left blank)',
        required: false,
        default: new ObjectId(),
    })
        _id: string;

    @IsArray()
    @Type(() => AccountBase, {
        // keepDiscriminatorProperty: true,
        discriminator: {
            property: 'provider_accounts',
            subTypes: [
                { value: EthereumAccountResponseDto, name: 'EthereumAccountResponseDto' },
                { value: DiscordAccountResponseDto, name: 'DiscordAccountResponseDto' },
            ],
        },
    })
    @ApiProperty({
        description: 'Array of accounts',
        isArray: true,
        type: AccountBase,
        required: false,
        // oneOf: [
        //     { $ref: getSchemaPath(EthereumAccountResponseDto) },
        //     { $ref: getSchemaPath(DiscordAccountResponseDto) },
        // ],
    })
        provider_accounts: (EthereumAccountResponseDto | DiscordAccountResponseDto)[];

    @ApiProperty({
        description: 'Datetime when record was created',
        required: false,
    })
        createdAt: string;

    @ApiProperty({
        description: 'Datetime when record was last updated',
        required: false,
    })
        updatedAt: string;

}

export class UserCreateDto extends OmitType(UserResponseDto, ['_id', 'createdAt', 'updatedAt', 'provider_accounts'] as const) {}

export class UserUpdateDto extends PartialType(UserCreateDto) {}