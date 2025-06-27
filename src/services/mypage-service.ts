// // 마이페이지에 필요한 데이터 관련된 함수들
// // ex. fetchUserProfile etc.

// //import dbConnect from '../../lib/dbConnect'; // lib/dbConnect 경로에 따라 수정
// //import Boards from '../models/Board'; // models/User 경로에 따라 수정
// import { NextResponse } from 'next/server';

// export async function GET(req: Request, res: NextResponse, next: Function) {
// 	await dbConnect();

// 	try {
// 		const boards = await Boards.find({});

// 		return NextResponse.json({ success: true, data: boards }, { status: 200 });
// 	} catch (error) {
// 		return NextResponse.json(
// 			{ success: false, error: (error as Error).message },
// 			{ status: 400 }
// 		);
// 	}
// }