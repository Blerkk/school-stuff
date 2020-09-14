package com.example.okosotthon30.ui.halo;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class haloViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public haloViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("");
    }

    public LiveData<String> getText() {
        return mText;
    }
}