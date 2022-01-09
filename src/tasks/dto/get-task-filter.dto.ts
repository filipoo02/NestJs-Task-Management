import { TaskStatus } from "../task-status.enum";
import { IsEnum, IsString, IsOptional } from 'class-validator'

export class GetTaskFilterDto{
    @IsOptional()
    @IsString()
    search?: string;
    
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}