package com.example.okosotthon30.ui.nappali;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class nappaliViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public nappaliViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("");
    }

    public LiveData<String> getText() {
        return mText;
    }
}