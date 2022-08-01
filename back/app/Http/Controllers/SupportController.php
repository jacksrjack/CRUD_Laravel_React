<?php

namespace App\Http\Controllers;

use App\Models\Support;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class SupportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Support::select('id','title','description','image')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'required|image'
        ]);

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('support/image', $request->image,$imageName);
            Support::create($request->post()+['image'=>$imageName]);

            return response()->json([
                'message'=>'Dúvida inserida com sucesso!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Desculpa! Algo deu errado ao criar a sua dúvida!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Support  $support
     * @return \Illuminate\Http\Response
     */
    public function show(Support $support)
    {
        //
        return response()->json([
            'support'=>$support
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Support  $support
     * @return \Illuminate\Http\Response
     */
    public function edit(Support $support)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Support  $support
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Support $support)
    {
        //
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'nullable'
        ]);

        try{

            $support->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($support->image){
                    $exists = Storage::disk('public')->exists("support/image/{$support->image}");
                    if($exists){
                        Storage::disk('public')->delete("support/image/{$support->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('support/image', $request->image,$imageName);
                $support->image = $imageName;
                $support->save();
            }

            return response()->json([
                'message'=>'item atualizado com sucesso!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Desculpa! Algo deu errado ao atualizar!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Support  $support
     * @return \Illuminate\Http\Response
     */
    public function destroy(Support $support)
    {
        //
        try {

            if($support->image){
                $exists = Storage::disk('public')->exists("support/image/{$support->image}");
                if($exists){
                    Storage::disk('public')->delete("support/image/{$support->image}");
                }
            }

            $support->delete();

            return response()->json([
                'message'=>'Item excluido com sucesso!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Desculpe! Algo deu errado ao excluir!!'
            ]);
        }
    }
}
