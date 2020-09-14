package com.example.okosotthon30.ui.etkezo;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import com.example.okosotthon30.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import androidx.annotation.DrawableRes;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class etkezoFragment extends Fragment {

    FirebaseDatabase  database;
    DatabaseReference myref;

    private etkezoViewModel etkezoViewModel;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflanter, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState){
        //homersekletLekeresEtkezo();
        ablakLekeresEtkezo();

        return inflanter.inflate(R.layout.fragment_etkezo, container, false);
    }

    public void homersekletLekeresEtkezo()
    {
        myref = FirebaseDatabase.getInstance().getReference("ETKEZO/TEMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Double etkezoHomerseklet = dataSnapshot.getValue(Double.class);

                TextView etkezoHomer = (TextView)getActivity().findViewById(R.id.homersekletTextEtkezo);
                etkezoHomer.setText(etkezoHomerseklet + " °C");
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void lampaAllapotLekeresEtkezo()
    {
        myref = FirebaseDatabase.getInstance().getReference("ETKEZO/LAMP");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean lampaAllapotEtkezo = dataSnapshot.getValue(Boolean.class);

                ImageView etkezoLampaAllapot = (ImageView) getActivity().findViewById(R.id.image);
                if (lampaAllapotEtkezo == true) {
                    //felkapcsolas icon
                }
                else {
                    //
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void ablakLekeresEtkezo()
    {
        myref = FirebaseDatabase.getInstance().getReference("ETKEZO/WINDOW");

        myref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean etkezoAblak = dataSnapshot.getValue(Boolean.class);

                TextView etkezoAblakStatus = (TextView)getActivity().findViewById(R.id.ablakAllapotEtkezo);

                if(etkezoAblak == true) {
                    etkezoAblakStatus.setText("Az ablak nyitva van!");
                }
                else {
                    etkezoAblakStatus.setText("Az ablak be van csukva!");
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }
}